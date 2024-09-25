import testServer from "../utils/testServer";
import UserRoute from "./UserRoute";

const request = testServer(UserRoute);

describe("[ routes / UserRoute ]", () => {
  it("should return a response with status 200 for listing users", async () => {
    const { status: result } = await request.get("/listar");
    expect(result).toEqual(200);
  });

  it("should return all users", async () => {
    const { body: result } = await request.get("/listar");
    expect(result).toEqual(expect.any(Array));
  });

  it("should create a user successfully", async () => {
    const newUser = {
      name_user: "Test User",
      email: "testuser@example.com",
      password: "testpassword",
    };
    const { status, body } = await request.post("/registrar").send(newUser);
    expect(status).toBe(200);
    expect(body.message).toEqual("Se registró el usuario con éxito");
  });

  it("should delete a user successfully", async () => {
    const userIdToDelete = 1; 
    const { status, body } = await request.delete(`/eliminar/${userIdToDelete}`);
    expect(status).toBe(200);
    expect(body.message).toEqual("uusuario eliminado correctamente");
  });

  it("should update a user successfully", async () => {
    const userIdToUpdate = 1;
    const updatedUser = {
      name_user: "Updated User",
      password: "newpassword",
    };
    const { status, body } = await request.put(`/actualizar/${userIdToUpdate}`).send(updatedUser);
    expect(status).toBe(200);
    expect(body.message).toEqual("Usuario actualizado");
  });
});
