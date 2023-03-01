import { Filter } from "@mikro-orm/core";

// Example of implementation in finds:
// await this.em.find(User, {}) // only returns active records
// await this.em.find(User, {}, { filters: { softDelete: { isDeleted: true} } }) // returns deleted records
// await this.em.find(User, {}, { filters: { softDelete: { isDeleted: null} } }) // returns all

export type SoftDeleteOptions = {
  enabled?: boolean;
  defaultIsDeleted?: boolean;
  field?: string;
};

const defaultOptions = { enabled: true, defaultIsDeleted: true, field: "hide" };

export const SoftDelete = (options: SoftDeleteOptions = {}): ClassDecorator => {
  const { enabled, defaultIsDeleted, field } = { ...defaultOptions, ...options };
  return Filter({
    name: "softDelete",
    cond: ({ isDeleted = defaultIsDeleted }: { isDeleted?: boolean } = {}) =>
      isDeleted ? { [field]: { $ne: null } } : isDeleted === false ? { [field]: null } : {},
    args: false,
    default: enabled,
  });
};
