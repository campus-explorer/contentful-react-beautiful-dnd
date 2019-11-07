import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Item from './item';
import { TextInput } from '@contentful/forma-36-react-components';
import { init } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';

export class App extends React.Component {
  static propTypes = {
    sdk: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = props.sdk.field.getValue() || '';
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();
  } 
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const column = this.state.columns[source.droppableId];
    const newItemIds = Array.from(column.itemIds);

    newItemIds.splice(source.index, 1);
    newItemIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      itemIds: newItemIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };
    this.setState(newState);
    this.props.sdk.field.setValue(newState);
  };
 
  render() {
	  const column = this.state.columns["column-1"];
	  const items = column.itemIds.map(itemId => this.state.items[itemId]);
    return (
	    <div className="Container">
		    <DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId={column.id}>
					{provided => (
					<div className="container" ref={provided.innerRef} {...provided.droppableProps}>
					  {items.map((item, index) => (
					    <Item key={item.id} item={item} index={index} />
					  ))}
					  {provided.placeholder}
					</div>
					)}
				</Droppable>
	      </DragDropContext>
      </div>
     
    );
  }
}

init(sdk => {
  ReactDOM.render(<App sdk={sdk} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
