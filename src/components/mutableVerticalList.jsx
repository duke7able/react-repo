import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

// const onDragEnd = (result , currentItems) => {
//   // dropped outside the list
//   if (!result.destination) {
//     return;
//   }
//   const items = reorder(
//     currentItems,
//     result.source.index,
//     result.destination.index
//   );
//   this.saveChanges(items);
// };

// const onDeleteItem = ( index , currentItems) => {
//   const items = Array.from(currentItems);
//   items.splice(index, 1);
//   this.saveChanges(items);
// };

// const MutableVerticalList = ({ props }) => {
//   return ( 
//           <h1>Home</h1>
//       );
// }

class MutableVerticalList extends Component {
  constructor(props) {
    super(props);
  }

  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    );
    this.saveChanges(items);
  };

  onDeleteItem = index => {
    const items = Array.from(this.props.items);
    items.splice(index, 1);
    this.saveChanges(items);
  };

  saveChanges = items => {
    this.props.onListChange(items);
  }

  render() {
    return (
      <React.Fragment>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {index + item.content}
                      <button
                        type="button"
                        onClick={() => this.onDeleteItem(index)}
                        class="close"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button className="btn btn-secondary" onClick={this.props.onReset}>Reset List</button>
      </React.Fragment>
    );
  }
}

export default MutableVerticalList;
