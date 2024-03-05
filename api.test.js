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
});