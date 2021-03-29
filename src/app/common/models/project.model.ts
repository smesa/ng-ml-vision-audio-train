import { visionCategoryModel } from "./model-category.model";
export interface projectModel {
  id?: string,
  name: string,
  type: string,
  description: string,
  visionCategories?: Array<visionCategoryModel>
}
