import { STATUS } from "../data/constants";

// Utility functions for the degree tracker

// Generate unique ID
export const makeId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Sum total units for a list of items
export const sumUnits = (items: any[]) =>
  items.reduce((acc, it) => acc + (it.units || 0), 0);

// Sum units for taken and currently taking items only
export const sumUnitsTaken = (items: any[]) =>
  items
    .filter(
      (it) =>
        it.status === STATUS.TAKEN || it.status === STATUS.CURRENTLY_TAKING
    )
    .reduce((acc, it) => acc + (it.units || 0), 0);

// Count how many items are taken or currently taking
export const countTaken = (items: any[]) =>
  items.filter(
    (it) => it.status === STATUS.TAKEN || it.status === STATUS.CURRENTLY_TAKING
  ).length;
