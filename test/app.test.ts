import * as supertest from "supertest";
import * as app from "../src/app";

describe("GET /random-url", () => {
    // const request = supertest("http://localhost:8000");
    it("should return 404", (done) => {
        supertest(app).get("/reset")
                .expect(404, done);
    });
});
