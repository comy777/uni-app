<template>
	<div 
		class="autocomplete pr-2 w-full my-4"
		:class="[ isMobile === true ? 'md:hidden' : '' ]"
	>
		<div class="flex">
			<div class="flex bg-sweetWhite pl-2 rounded-l-2xl">
				<SearchIcon @click="handleQuerySelected" class="self-center cursor-pointer" />
			</div>

			<input
				id="autocomplete-search-input"
				class="bg-sweetWhite p-2 outline-none w-[95%]"
				type="text"
				placeholder="Search..." 
				@input="handleInput" 
				@keydown.up="handleArrowUp" @keydown.down="handleArrowDown"
				@keydown.left="handleArrowLeft" @keydown.right="handleArrowRight"
				@keydown.enter="handleQuerySelected"
				v-model="query" 
			/>

			<slot name="feedback"></slot>
		</div>

		<ul id="autocomplete-results" class="autocomplete-results w-[95%] absolute top-[3.5rem]"
			v-show="isOpen"
		>
			<li v-if="isLoading" class="loading">
				Loading suggestions...
			</li>
			<li v-else v-for="(suggestion, i) in suggestions" 
				@click="selectSuggestion(suggestion)"
				:key="i"
				class="autocomplete-result" :class="{ 'is-active': i === arrowCounter }">
				{{ suggestion }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SearchQuerySignature } from "../../models/searchbar";
import SearchIcon from '../../components/icons/SearchIcon.vue';

export default defineComponent({
	name: 'SearchAutocomplete',

	components: {
		SearchIcon,
	},

	mounted() {
		document.addEventListener('click', this.handleClickOutside);
	},
	unmounted() {
		document.removeEventListener('click', this.handleClickOutside);
	},

	props: {
		items: {
			type: Array as PropType<any[]>,
			required: false,
			default: () => [] as any[],
		},
		isAsync: {
			type: Boolean,
			required: false,
			default: false,
		},
		isMobile: {
			type: Boolean,
			required: false,
			default: false,
		},
		suggestionsDisplayer: {
			type: Function as PropType<SearchQuerySignature>,
			required: false,
			default: null,
		}
	},

	emits: ['query', 'selected'],

	data() {
		return {
			lastSearchInput: '', // Used to handle arrow based interactivity (left and right arrows)
			query: '',
			selected: '',
			isOpen: false,
			isLoading: false,
			loaded: false,
			suggestions: [] as string[],
			arrowCounter: -1, // To start at index 0 when user press arrowDown
		}
	},

	watch: {
		// Update the suggestions each time the searchbar items change
		items: function (value, oldValue) {
			if (value.length !== oldValue.length) {
				this.displaySuggestions()
				this.isLoading = false
				this.loaded = true
			}
		},

		// Hide autocompletion searchbar menu when the query has a length of ZERO.
		query: function (value, oldValue) {
			if (value.length <= 0) {
				this.suggestions = []
				this.isOpen = false
			}
		}
	},

	methods: {
		selectSuggestion(item: string) {
			this.query = item
			this.selected = item
			this.$emit('selected', this.selected)
			this.$emit('query', this.query)

			this.isOpen = false
		},

		// handleKeyboardSearchSuggestion is an utility function only used by keyboard events such as handleArrowRight functions
		handleKeyboardSearchSuggestion() {
			const currentItem = this.suggestions[this.arrowCounter]

			if (currentItem !== undefined) {
				this.query = currentItem
			}
		},

		// Handle keyboard based navigation in searchbar (enter)
		// Expected behaviour is to autocomplete and confirm the user query
		handleQuerySelected() {
			this.selectSuggestion(this.query)
			this.arrowCounter = -1
			this.isOpen = false
		},

		// displaySuggestions handle the display process of suggestions by searching
		//  the current query using either the default "displaySuggestionsByDefault" method or a custom one passed into the 
		// "suggestionsDisplayer" function property
		displaySuggestions() {
			const displaySuggestionsFunc = this.$props.suggestionsDisplayer

			// Default search 
			if (displaySuggestionsFunc === null) {
				const suggestions = this.displaySuggestionsByDefault()
				this.suggestions = suggestions
				return
			}

			// Custom search
			const suggestions = displaySuggestionsFunc(this.query, this.items)
			this.suggestions = suggestions
		},

		// displaySuggestionsByDefault provides a default way to display suggestions given a query, this
		// searchbar component allows using a custom suggestion function otherwise.
		displaySuggestionsByDefault(): string[] {
			const suggestions = this.items.filter((item: any) => item.toLowerCase().indexOf(this.query.toLowerCase()) > -1)
			return suggestions
		},

		handleInput(inputEvent: Event) {
			this.isOpen = true

			const theQuery = (inputEvent.target as HTMLInputElement).value
			this.lastSearchInput = theQuery
			this.$emit('query', this.query)

			if (this.isAsync && this.loaded === false) {
				this.isLoading = true
			} else {
				this.displaySuggestions()
			}
		},

		// Handle keyboard based navigation in searchbar (arrowUp)
		// Expected behaviour is to go up one position in the completion list
		handleArrowUp() {
			if (this.arrowCounter > 0) {
				this.arrowCounter = this.arrowCounter - 1
				this.handleKeyboardSearchSuggestion()
			}
		},
		// Handle keyboard based navigation in searchbar (arrowDown)
		// Expected behaviour is to go down one position in the completion list
		handleArrowDown() {
			if (this.arrowCounter < this.suggestions.length - 1) {
				this.arrowCounter = this.arrowCounter + 1
				this.handleKeyboardSearchSuggestion()
			}
		},

		// handle left and right arrows
		handleSidesArrows() {
			this.query = this.lastSearchInput
			this.arrowCounter = -1 // restarts it

			const inputNode = document.getElementById("autocomplete-search-input") as HTMLInputElement
			const resultsNode = document.getElementById("autocomplete-results")

			inputNode.focus()
			const inputLastPosition = this.lastSearchInput.length

			// This setTimeout function is really important for correct cursorBehavior when using arrowLeft key
			// (setSelectionRange function will only work fine if wrapped in this setTimeout function)
			// This is because of some time is needed to render the UI and this function helps to wait that minimum time.
			setTimeout(() => {
				inputNode.setSelectionRange(inputLastPosition, inputLastPosition);	

				// Restore the focus to the correct element
				if (resultsNode) {
					resultsNode.focus()
					inputNode.focus()
				}
			}, 0)		
		},

		// Handle keyboard based navigation in searchbar (arrowRight)
		// The expected behaviour is to autocomplete the user query without confirming it yet
		handleArrowRight() {
			this.handleSidesArrows()
		},

		// Handle keyboard based navigation in searchbar (arrowLeft)
		// The expected behaviour is to go back to the user's last query
		handleArrowLeft() {
			this.handleSidesArrows()
		},

		// closes the component if it's not being focused
		handleClickOutside(event: any) {
			if (!this.$el.contains(event.target)) {
				this.arrowCounter = -1 // Reset couhter
				this.isOpen = false
			}
		},
	}
});
</script>


<style scoped>
.autocomplete {
	position: relative;
}

#autocomplete-search-input {
	border-top-right-radius: 1rem;
	border-bottom-right-radius: 1rem;
}

.autocomplete-results {
	padding: 0;
	margin: 0;
	border: 1px solid #eeeeee;
	max-height: 170px;
	background-color: white;
	border-radius: 10px;
	overflow: auto;
	z-index: 1;
}

.autocomplete-result {
	list-style: none;
	text-align: left;
	padding: 4px 15px;
	/* border: solid 1px black; */
	border-radius: 10px;
	cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
	background-color: #ededed;
	color: black;
}
</style>