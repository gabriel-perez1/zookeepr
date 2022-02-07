const fs = require("fs");
const {
	filterByQuery,
	findById,
	createNewZookeeper,
	validateZookeeper,
} = require("../lib/zookeepers");

const { zookeepers } = require("../data/zookeepers.json");

jest.mock('fs');

test("create new zookeeper object", () => {
	const zookeeper = createNewZookeeper(
		{ id: "666", name: "cocomong"},
		zookeepers
	);

	expect(zookeeper.id).toBe("666");
	expect(zookeeper.name).toBe("cocomong");
});

test("filters by query", () => {
	const startingZookeepers = [
		{
			id: "1",
			name: "Raksha",
			age: 31,
			favoriteAnimal: "penguin"
		},
		{
			id: "2",
			name: "Isabella",
			age: 67,
			favoriteAnimal: "bear"
		},
	];

	const updatedZookeepers = filterByQuery({ favoriteAnimal: "penguin"}, startingZookeepers);

	expect(updatedZookeepers.length).toEqual(1);
});

test("find by id", () => {
	const startingZookeepers = [
		{
			id: "1",
			name: "Raksha",
			age: 31,
			favoriteAnimal: "penguin"
		},
		{
			id: "2",
			name: "Isabella",
			age: 67,
			favoriteAnimal: "bear"
		},
	];

	const result = findById("1", startingZookeepers);

	expect(result.name).toBe("Raksha");
});

test("validates age", () => {
	const zookeeper = {
		id: "1",
		name: "Raksha",
		age: 31,
		favoriteAnimal: "penguin"
	};

	const invalidZookeeper = {
		id: "1",
		name: "Raksha",
		favoriteAnimal: "penguin"
	};

	const result = validateZookeeper(zookeeper);
	const result2 = validateZookeeper(invalidZookeeper);

	expect(result).toBe(true);
	expect(result2).toBe(false);
});

