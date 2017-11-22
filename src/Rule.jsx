import React from 'react';

export default class Rule extends React.Component {
  static get defaultProps() {
    return {
      id: null,
      parentId: null,
      field: null,
      operator: null,
      value: null,
      schema: null,
    };
  }

  render() {
    const { id, field, operator, value, schema: { fields, controls, getOperators, getLevel, classNames } } = this.props;
    var level = getLevel(this.props.id);
    return (
      <li className={`rule ${classNames.rule}`}>
        <div className="rule-header">
          <div className="btn-group pull-right rule-actions">
            {
              React.createElement(controls.removeRuleAction,
                {
                  label: (<span><i className="glyphicon glyphicon-remove"/> Delete </span>),
                  className: `rule-remove ${classNames.removeRule}`,
                  handleOnClick: this.removeRule,
                  level: level,
                })
            }
          </div>
        </div>
        <div className="rule-filter-container">
          {
            React.createElement(controls.fieldSelector,
              {
                id: id,
                options: fields,
                value: field,
                className: `rule-fields ${classNames.fields}`,
                handleOnChange: this.onFieldChanged,
                level: level,
              },
            )
          }
        </div>
        <div className="rule-operator-container">
          {
            React.createElement(controls.operatorSelector,
              {
                id: id,
                field: field,
                options: getOperators(field),
                value: operator,
                className: `rule-operators ${classNames.operators}`,
                handleOnChange: this.onOperatorChanged,
                level: level,
              },
            )
          }
        </div>
        <div className="rule-value-container">
          {
            React.createElement(controls.valueEditor,
              {
                id: id,
                field: field,
                operator: operator,
                value: value,
                className: `rule-value form-control ${classNames.value}`,
                handleOnChange: this.onValueChanged,
                level: level,
              },
            )
          }
        </div>
      </li>
    );
  }

  onFieldChanged = (value) => {
    this.onElementChanged('field', value);
  };

  onOperatorChanged = (value) => {
    this.onElementChanged('operator', value);
  };

  onValueChanged = (value) => {
    this.onElementChanged('value', value);
  };

  onElementChanged = (property, value) => {
    const { id, schema: { onPropChange } } = this.props;

    onPropChange(property, value, id);
  };

  removeRule = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.schema.onRuleRemove(this.props.id, this.props.parentId);
  };

}
