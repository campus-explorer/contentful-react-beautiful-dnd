import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Item from './item';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const TaskList = styled.div`
  padding: 8px;
`;
const ConsoleLog = ({ children }) => {
	console.log(children);
	return false;
}
export default class Column extends React.Component {
	constructor(props){
		super(props);
		this.innerRef = React.createRef();
		
	}
  render() {
    return (
      <Container>
        <Droppable droppableId={this.props.column.id}>
          {provided => (
	          <>
	        <ConsoleLog>{provided}</ConsoleLog>
            <div className="container" ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.items.map((item, index) => (
                <Item key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
            </>
          )}
        </Droppable>
      </Container>
    );
  }
}