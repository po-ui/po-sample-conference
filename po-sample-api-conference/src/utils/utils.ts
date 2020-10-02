import { Item } from "src/core/interfaces/collection.interface";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export abstract class Utils {
  static paginate(items: Array<any>, page = 1, pageSize: number): Array<any> {
    return items.slice((page - 1) * pageSize, page * pageSize);
  }

  static filterByAll(label: string, items: any) {
    const filter = label.toLowerCase().trim();

    return items.filter(item => {
      const findByProperty = (property: string): any => {
        return (
          typeof item[property] === 'string' &&
          item[property].toLowerCase().includes(filter)
        );
      };

      return Object.keys(item).some(findByProperty);
    });
  }

  static completePost():Item {
    const id = new Date().getTime().toString();
    const createdDate = new Date().toString();
    const updatedDate = new Date().toString();
    const deleted = false
    return {id, createdDate, updatedDate, deleted}
  }

  static softDelete<T extends Item>(item: T): T{
    return {...item, deleted:true, updatedDate:new Date().toString()}
  }


}
