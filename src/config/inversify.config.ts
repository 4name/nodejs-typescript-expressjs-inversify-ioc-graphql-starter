import { Container } from 'inversify';
import { Katana, Ninja, Shuriken } from '../models/entities';
import { ThrowableWeapon, Warrior, Weapon } from '../models/interfaces';
import { TYPES } from '../models/types';

const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export { myContainer };
