const request = require("supertest");
const { agent } = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

const res = {
  scrapContent: jest.fn(),
  result: jest.fn(),
  id: jest.fn(),
};

const req = {
  body: {
    content: jest.fn(),
    urlAddress: jest.fn(),
  },
};

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Scrap", () => {
  const scrapId = "637f5f318631e30874181d8f";

  describe("GET /:scrap_id", () => {
    it("should not allow invalid scrapId", (done) => {
      request(app)
        .get(`/scrapContent/invalidId`)
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it("should respond scrapContent to a valid scrapId", (done) => {
      agent(app)
        .get(`/scrapContent/${scrapId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.scrapContent).toContain;
          done();
        });
    });
  });

  describe("POST /", () => {
    it("GET / should not allow invalid scrapId", (done) => {
      request(app)
        .post(`/scrapContent`)
        .expect(500)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it("GET / should respond scrapContent to a valid scrapId", (done) => {
      agent(app)
        .post(`/scrapContent`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.result).toContain;
          expect(res.id).toContain;
          done();
        });
    });
  });
});
