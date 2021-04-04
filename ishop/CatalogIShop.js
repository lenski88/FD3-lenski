let CatalogIShop = React.createClass({
  displayName: "CatalogIShop",

  render: function () {

    let headerTable = this.props.catalogHd.map((i) =>
        React.DOM.tr({key:i.code, className:"CatalogTr"},
        React.DOM.th({className:"CatalogTd"}, i.nameHeader,),
        React.DOM.th({className:"CatalogTd"}, i.priceHeader),
        React.DOM.th({className:"CatalogTd"}, i.urlImageHeader),
        React.DOM.th({className:"CatalogTd"}, i.balanceHeader),
        )
    );
    
    let catalogCode = this.props.catalog.map((i) =>
        React.DOM.tr({ key: i.code, className: "CatalogTr" },
        React.DOM.td({ className: "CatalogTd" }, i.name),
        React.DOM.td({ className: "CatalogTd" }, i.price),
        React.DOM.td({ className: "CatalogTd" }, React.DOM.img({className: "CatalogImage", src:i.urlImage})),
        React.DOM.td({ className: "CatalogTd" }, i.balance)
      )
    );

    return React.DOM.div(
      { className: "CatalogIShop" },
      React.DOM.div({ className: "Nameshop" }, this.props.nameShop),
      React.DOM.table({ className: "CatalogTable"}, React.DOM.tbody({className:"CatalogTBody"}, headerTable, catalogCode)),
    );
  },
});
