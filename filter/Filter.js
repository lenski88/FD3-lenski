let Filter = React.createClass({
  displayName: "Filter",

  propTypes: {
    words: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        word: React.PropTypes.string.isRequired,
        code: React.PropTypes.number.isRequired,
      })
    ),
  },

  getInitialState: function () {
    return {
      list: this.props.words,
      isCheck: false,
      text: "",
    };
  },

  sortAlphabet: function (EO) {
    this.setState({ isCheck: EO.target.checked }, this.filter);
  },

  sortInput: function (EO) {
    this.setState({ text: EO.target.value }, this.filter);
  },

  reset: function (EO) {
      this.setState({list: this.props.words,isCheck: false,text: ""});
  },

  filter: function () {
    let text = this.state.text;
    let isCheck = this.state.isCheck;
    let wordsList = this.props.words.concat();

    if (isCheck) {
      wordsList = wordsList.sort((a, b) => {
        if (a.word > b.word) return 1;
        if (a.word < b.word) return -1;
        return 0;
      });
    }

    if (text) {
      wordsList = wordsList.filter((i) => i.word.includes(text));
    }

    this.setState({ list: wordsList });
  },

  render: function () {
    let list = this.state.list.map((i) => {
      return React.DOM.option(
        { className: "FilterOption", key: i.code },
        i.word
      );
    });

    return React.DOM.div(
      { className: "FilterBlock" },
      React.DOM.div(
        { className: "FilterMenu" },
        React.DOM.input({
          className: "FilterCheckBox",
          type: "checkbox",
          checked: this.state.isCheck,
          onClick: this.sortAlphabet
        }),
        React.DOM.input({
          className: "FilterTypeText",
          type: "text",
          value: this.state.text,
          onChange: this.sortInput
        }),
        React.DOM.input({
          className: "FilterButton",
          type: "button",
          value: "Сброс",
          onClick: this.reset
        })
      ),
      React.DOM.select({ className: "FilterSelect", size: 10 }, list)
    );
  },
});
