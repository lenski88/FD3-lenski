let Shop = React.createClass({
  displayName: "Shop",

  propTypes: {
    nameShop: React.PropTypes.string.isRequired,
    catalogHd: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        nameHeader: React.PropTypes.string.isRequired,
        code: React.PropTypes.string.isRequired,
        priceHeader: React.PropTypes.string.isRequired,
        urlImageHeader: React.PropTypes.string.isRequired,
        balanceHeader: React.PropTypes.string.isRequired,
        removeHeader: React.PropTypes.string.isRequired,
      })
    ),
  },

  getInitialState: function () {
    return {
      products: this.props.catalog,
      isClickString: false,
    };
  },

  clickedString: function (tr) {
    this.setState({ isClickString: tr });
  },

  deleteProduct: function (tr) {
    let question = confirm("Удалить?");
    if (question) {
      let deleteProd = this.state.products.filter((i) => i.id !== tr);
      this.setState({ products: deleteProd });
    }
  },

  render: function () {
    let product = this.state.products.map((i) =>
      React.createElement(Product, {
        id: i.id,
        name: i.name,
        key: i.code,
        price: i.price,
        urlImage: i.urlImage,
        balance: i.balance,
        isClickString: i.id === this.state.isClickString,
        clickString: this.clickedString,
        deleteString: this.deleteProduct,
      })
    );
    let headerTable = this.props.catalogHd.map((i) =>
      React.DOM.tr(
        { key: i.code, className: "CatalogTr" },
        React.DOM.th({ className: "CatalogTd" }, i.nameHeader),
        React.DOM.th({ className: "CatalogTd" }, i.priceHeader),
        React.DOM.th({ className: "CatalogTd" }, i.urlImageHeader),
        React.DOM.th({ className: "CatalogTd" }, i.balanceHeader),
        React.DOM.th({ className: "CatalogTd" }, i.removeHeader)
      )
    );

    return React.DOM.div(
      { className: "CatalogIShop" },
      React.DOM.div({ className: "Nameshop" }, this.props.nameShop),
      React.DOM.table(
        { className: "CatalogTable" },
        React.DOM.tbody({ className: "CatalogTBody" }, headerTable, product)
      )
    );
  },
});
