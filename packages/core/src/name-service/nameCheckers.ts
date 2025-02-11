import { AddressSystem } from '../Address';
import { NetworkId } from '../Network';
import { NameChecker } from './types';

// ## ENS
export const ensNameChecker: NameChecker = {
  addressSystem: AddressSystem.evm,
  checker(name) {
    return name.endsWith('.eth') && name.normalize() === name;
  },
};
// ## Bonfida
export const bonfidaNameChecker: NameChecker = {
  addressSystem: AddressSystem.solana,
  checker(name) {
    return name.endsWith('.sol');
  },
};
// ## Glow
export const glowNameChecker: NameChecker = {
  addressSystem: AddressSystem.solana,
  checker(name) {
    return name.endsWith('.glow');
  },
};
// ## Avalanche
export const avalancheNameChecker: NameChecker = {
  addressSystem: AddressSystem.evm,
  checker(name) {
    return name.endsWith('.avax');
  },
};
// ## Aptos
export const aptosNameChecker: NameChecker = {
  addressSystem: AddressSystem.move,
  networkId: NetworkId.aptos,
  checker(name) {
    return name.endsWith('.apt');
  },
};

export const nameCheckers: NameChecker[] = [
  ensNameChecker,
  bonfidaNameChecker,
  glowNameChecker,
  avalancheNameChecker,
  aptosNameChecker,
];
