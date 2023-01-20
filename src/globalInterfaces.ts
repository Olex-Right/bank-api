export interface IService<DTO, Model> {
  create: (dto: DTO) => Promise<Model>;
  getAll: () => Promise<Model[]>;
  getOneById: (id: number) => Promise<Model>;
  updateOneById: (id: number, dto: DTO) => Promise<Model>;
  deleteOneById: (id: number) => void;
}
