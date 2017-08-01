import React from 'react';


const FilterTodo = ({ onFilterClick }) => {

  const FilterLink = ({ filter, children }) => {
    return (
      <a href="javascript:;" onClick = { (e) => {
        e.preventDefault();
        onFilterClick(filter);
      }}>
        { children }
      </a>
    );
  };

  return (
    <p>
      Show:
      {' '}
      <FilterLink filter = 'SHOW_ALL'> All </FilterLink>,
      {' '}
      <FilterLink filter = 'SHOW_ACTIVE'> Active </FilterLink>,
      {' '}
      <FilterLink filter = 'SHOW_COMPLETED'> Completed </FilterLink>
    </p>
  );
};

export default FilterTodo;
