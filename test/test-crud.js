const { assert } = require("chai");
const { ethers, deploy } = require("hardhat");

describe("Crud", async function () {
  let crud;
  beforeEach(async function () {
    const crudFactory = await ethers.getContractFactory("Crud");
    crud = await crudFactory.deploy();
  });
  it("should create a new user", async () => {
    const expectedPerson = "sumon";
    await crud.create(expectedPerson);
    const user = await crud.read(1);
    assert.equal(user[0].toNumber(), "1");
    assert.equal(user[1], expectedPerson);
  });
  it("should update a user", async () => {
    const expectedPerson = "sumon";
    await crud.create(expectedPerson);
    await crud.update(1, "sumonn");
    const user = await crud.read(1);
    assert.equal(user[0].toNumber(), "1");
    assert.equal(user[1], "sumonn");
  });
  it("should not update a non existing user", async () => {
    try {
      await crud.update(2, "sumonnn");
    } catch (e) {
      assert(e.message.includes("Users does not exists!"));
      return;
    }
    assert(false);
  });
  it("should delete a user", async () => {
    await crud.create("sumon");
    await crud.deleteId(1);
    try {
      await crud.read(1);
    } catch (e) {
      assert(e.message.includes("Users does not exists!"));
      return;
    }
    assert(false);
  });
  it("should not delete a non existing user", async () => {
    try {
      await crud.deleteId(10);
    } catch (e) {
      assert(e.message.includes("Users does not exists!"));
      return;
    }
    assert(false);
  });
});
