describe('constructor factory',
function ()
{  var
	Animal, VertebrateAnimal, GenderedAnimal, Felyne, Tiger, Kitten,
	tiger, kitten;


	describe('creating constructors',
	function () {
		it('should be able to create a simple constructor',
		function () {
			Animal = Class({
				__init__: function (name) {
					this.name = name;
				},

				die: function () {
					return this.name + ' died.';
				},

				make_sound: function ()
				{ var sound;
					sound = this.sound || '...';
					return this.name + ': "' + sound + '!"';
				}
			});

			expect(Animal.constructor).toBe(Function);
		});

		it('should be able to create child constructors',
		function () {
			VertebrateAnimal = Class([Animal], {
				walk: function () {
					return this.name + ' is walking.';
				}
			});

			GenderedAnimal = Class([Animal], {
				__init__: function (name, gender) {
					this._super('__init__')(name);
					this.gender = gender;
				}
			});

			expect(VertebrateAnimal.constructor).toBe(Function);
			expect(VertebrateAnimal.__bases__()).toContain(Animal);
		});

		it('should be able to create constructors with mixins',
		function () {
			Felyne = Class([GenderedAnimal, VertebrateAnimal], {
				paws: 4
			});

			expect(Felyne.constructor).toBe(Function);
			expect(Felyne.__bases__()).toContain(VertebrateAnimal);
			expect(Felyne.__bases__()).toContain(GenderedAnimal);
		});


		it('should be able to create constructors with deep inheritance',
		function () {
			Tiger = Class([Felyne], {
				$species_name: 'panthera tigris',
				sound: 'rawr'
			});

			Kitten = Class([Felyne], {
				$species_name: 'felis silvestris catus',
				sound: 'meow'
			});

			expect(Tiger.constructor).toBe(Function);
		});
	});

	it('should handle static properties',
	function () {
		expect(Tiger.species_name).toBe('panthera tigris');
	})

	describe('instances and inheritances',
	function () {
		it('should instantiate correctly',
		function () {
			tiger = new Tiger('Khan', 'M');
			kitten = new Kitten('Lisa', 'F');
			
			expect(tiger.constructor).toBe(Tiger);
			expect(tiger.sound).toBe('rawr');
			expect(kitten.constructor).toBe(Kitten);
			expect(kitten.sound).toBe('meow');
		});

		it('should have the instances inheriting stuff',
		function () {
			expect(tiger.paws).toBe(4);
			expect(tiger.die).not.toBe(undefined);
			expect(tiger.walk).not.toBe(undefined);
			expect(kitten.make_sound()).toBe('Lisa: "meow!"')
		});

		it('should overwrite and call super methods correctly',
		function () {
			expect(tiger.name).toBe('Khan');
			expect(tiger.gender).toBe('M');
		})
	});
})
