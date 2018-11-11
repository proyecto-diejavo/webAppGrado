import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  divider: {
    height: theme.spacing.unit * 2
  }
})

class IntegrationAutosuggest extends React.Component {
  state = {
    single: '',
    popper: '',
    suggestions: []
  }
  renderInputComponent = inputProps => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps
    return (
      <TextField
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node)
            inputRef(node)
          },
          classes: {
            input: classes.input
          }
        }}
        {...other}
      />
    )
  }

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.label, query)
    const parts = parse(suggestion.label, matches)
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            )
          })}
        </div>
      </MenuItem>
    )
  }

  getSuggestions = value => {
    const { suggestions } = this.props
    const inputValue = deburr(value.trim()).toLowerCase()
    const inputLength = inputValue.length
    let count = 0
    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.label.slice(0, inputLength).toLowerCase() === inputValue
          if (keep) {
            count += 1
          }
          return keep
        })
  }

  getSuggestionValue = suggestion => {
    return suggestion.label
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    })
  }

  render() {
    const { classes, placeholder } = this.props

    const autosuggestProps = {
      renderInputComponent: this.renderInputComponent,
      suggestions: this.state.suggestions,
      placeholder: placeholder,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion: this.renderSuggestion
    }

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: placeholder,
            value: this.state.single,
            onChange: this.handleChange('single')
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={suggestions => (
            <Paper {...suggestions.containerProps} square>
              {suggestions.children}
            </Paper>
          )}
        />
        <div className={classes.divider} />
      </div>
    )
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.object.isRequired,
  placeholder: PropTypes.string
}

export default withStyles(styles)(IntegrationAutosuggest)
