import React from "react";
import { Item } from "../../../types/item";

interface ItemProps {
    items: Item[];
    renderComponent?: (item: Item) => JSX.Element;
}

const ItemList = ({ items, renderComponent }: ItemProps) => {
  return (
    <div className="mt-4 bg-gray-400 p-4 max-h-48 lg:max-h-[500px] overflow-y-auto rounded">
      {items?.map(item => (
        <React.Fragment key={item.id}>
            {renderComponent?.(item)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ItemList;