let CatalogIShop = React.createClass({
  displayName: "CatalogIShop",

  render: function () {
    let catalogCode = this.props.catalog.map((i) =>
        React.DOM.tr({ key: i.code, className: "CatalogTr" },
        React.DOM.td({ className: "CatalogTd" }, i.name),
        React.DOM.td({ className: "CatalogTd" }, i.price),
        React.DOM.td({ className: "CatalogTd" }, i.urlImage),
        React.DOM.td({ className: "CatalogTd" }, i.balance)
      )
    );

    return React.DOM.div(
      { className: "CatalogIShop" },
      React.DOM.div({ className: "Nameshop" }, this.props.nameShop),
      React.DOM.table({ className: "CatalogTable" }, catalogCode),
    );
  },
});
