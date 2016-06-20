import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const LiquorCategory = (props) => {
  return (
    <div>
      {
        props.categories.map((category, index) => {
          return (
            <div key={index} className="category">
              <p> Name: {category.name} </p>
              <p> Notes: {category.notes}</p>
              <LiquorSubCategory subCategories={category.subcategory} />
            </div>
          );
        })
      }
    </div>
  );
};

const LiquorSubCategory = (props) => {
  return (
    <ul>
      {
        props.subCategories.map((subCategory, index) => {
          return (
            <li key={index}>
              <p>Name: {subCategory.name}</p>
              <p>Aroma: {subCategory.aroma}</p>
            </li>
          );
        })
      }
    </ul>
  );
};

export default class LiquorTable extends Component {
  handleSelect(index, last) {
    console.log(index, last);
  }
  render() {
    const { styleguide = {} } = this.props;
    const liquorClass = styleguide.class || [];
    return (
      <Tabs
        onSelect={::this.handleSelect}
        selectedIndex={0}
      >
        <TabList>
          {
            liquorClass.map((liquor, key) => {
              return <Tab key={key}> {liquor.$.type} </Tab>;
            })
          }
        </TabList>
        {
          liquorClass.map((liquor, index) => {
            return (
              <TabPanel key={index}>
                <LiquorCategory categories={liquor.category} />
              </TabPanel>
            );
          })
        }
      </Tabs>
    );
  }
}

