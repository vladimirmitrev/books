const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');

const expect = chai.expect;

chai.use(chaiHttp);

// describe("Books API Tests", () => {
//     it("should POST a book", (done) => {
//         const reqBody = {id: "1", title: "DevOps Magic 2", author: "Pesho"};
//         chai.request(server)
//             .post("/books")
//             .send(reqBody)
//             .end((err, resp) => {
//                 if (err) {
//                     return done(err)
//                 }
//                 expect(resp.statusCode, "Status Code").to.be.equal(201);
//                 expect(resp.body).to.be.a("object");
//                 expect(resp.body.id).to.be.equal(reqBody.id);
//                 expect(resp.body.id).to.exist;
//                 expect(resp.body).to.have.property("id");
//                 expect(resp.body.title, "Title property").to.be.equal(reqBody.title);
//                 expect(resp.body.author).to.be.equal(reqBody.author);
//                 done();
//             });
//     });
describe('Books API', () => {
    let bookId;

    it('should POST a book', (done) => {
        const book = { id: "1", title: "Test Book", author: "Test Author"};

        chai.request(server)
        .post('/books')
        .send(book)
        .end((err, resp) => {
            if(err) {
                return done(err)
            }
            expect(resp).to.have.status(201);
            expect(resp.body).to.be.a('object');
            expect(resp.body).to.have.property('id');
            expect(resp.body).to.have.property('title');
            expect(resp.body).to.have.property('author');
            bookId = resp.body.id;
            done();
        });
    });

    it('should GET all books', (done) => {
        chai.request(server)
        .get('/books')
        .end((err, resp) => {
            if(err) {
                return done(err)
            }
            expect(resp).to.have.status(200);
            expect(resp.body).to.be.a('array');
            done();
        })
    });

    it('should GET a single book', (done) => {
    
        chai.request(server)
        .get(`/books/${bookId}`)
        .end((err, resp) => {
            if(err) {
                return done(err)
            }
            expect(resp).to.have.status(200);
            expect(resp.body).to.be.a('object');
            expect(resp.body).to.have.property('id');
            expect(resp.body).to.have.property('title');
            expect(resp.body).to.have.property('author');
            done();
        });
    });

    
    it('should PUT an existing book', (done) => {
        const updatedBook = { id: bookId, title: "Update Test Book", author: "Update Test Author"};
        chai.request(server)
        .put(`/books/${bookId}`)
        .send(updatedBook)
        .end((err, resp) => {
            if(err) {
                return done(err)
            }
            expect(resp).to.have.status(200);
            expect(resp.body).to.be.a('object');
            expect(resp.body.title).to.equal('Update Test Book');
            expect(resp.body.author).to.equal('Update Test Author');
            done();
        });
    });

    it('should DELETE an existing book', (done) => {
        chai.request(server)
        .delete(`/books/${bookId}`)
        .end((err, resp) => {
            if(err) {
                return done(err)
            }
            expect(resp.statusCode, "Status code ").to.equal(204);
            done();
        });
    });

    it('should return 404 when trying to GET, PUT or DELETE a non-existing book', (done) => {
        const nonExisting = { id: 9999, title: "Non-existing Book", author: "Non-existing Author"};
        chai.request(server)
        .get('/books/9999')
        .end((err, resp) => {
            expect(resp).to.have.status(404);
        });

        chai.request(server)
        .put('/books/9999')
        .send(nonExisting)
        .end((err, resp) => {
            expect(resp).to.have.status(404);
        });

        chai.request(server)
        .delete('/books/9999')
        .end((err, resp) => {
            expect(resp).to.have.status(404);
            done();
        });
    })
});