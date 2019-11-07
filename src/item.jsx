import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { TextInput, TextField } from '@contentful/forma-36-react-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export default class Item extends React.Component {
  render() {
    return (
	   
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {provided => (
          <div
          className="itemBox"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
           ref={provided.innerRef}
          >
          	<h3>{this.props.item.headline}</h3>
            <p>{this.props.item.content}</p>
          </div>
        )}
      </Draggable>
    );
  }
}