let Product = React.createClass({
  displayName: "Product",

  propTypes: {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    urlImage: React.PropTypes.string.isRequired,
    balance: React.PropTypes.number.isRequired,
    clickString: React.PropTypes.func,
    isClickString: React.PropTypes.bool,
    deleteString: React.PropTypes.func,
  },

  clickString: function () {
    this.props.clickString(this.props.id);
  },

  deleteString: function () {
    this.props.deleteString(this.props.id);
  },

  render: function () {
    let colorString;
    if (this.props.isClickString) {
      colorString = { backgroundColor: "red" };
    } else {
      colorString = null;
    }

    return React.DOM.tr(
      {
        className: "CatalogTr",
        style: colorString,
        onClick: this.clickString,
      },
      React.DOM.td({ className: "CatalogTd" }, this.props.name),
      React.DOM.td({ className: "CatalogTd" }, this.props.price),
      React.DOM.td(
        { className: "CatalogTd" },
        React.DOM.img({ className: "CatalogImage", src: this.props.urlImage })
      ),
      React.DOM.td({ className: "CatalogTd" }, this.props.balance),
      React.DOM.td(
        { className: "CatalogTd" },
        React.DOM.input({
          className: "ButtonDelete",
          type: "button",
          value: "Удалить",
          onClick: this.deleteString,
        })
      )
    );
  },
});
