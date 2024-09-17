var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var MovieList = /** @class */ (function () {
    function MovieList(movies) {
        this.movies = movies;
        this.filters = {};
    }
    MovieList.prototype.applyFilters = function (filters) {
        this.filters = __assign(__assign({}, this.filters), filters);
    };
    MovieList.prototype.getFilteredMovies = function () {
        var _this = this;
        return this.movies.filter(function (movie) {
            var _a = _this.filters, title = _a.title, releaseYear = _a.releaseYear, rating = _a.rating, awards = _a.awards;
            if (title &&
                !movie.title.toLowerCase().includes(title.filter.toLowerCase())) {
                return false;
            }
            if (releaseYear &&
                (movie.releaseYear < releaseYear.filter ||
                    movie.releaseYear > releaseYear.filterTo)) {
                return false;
            }
            if (rating &&
                (movie.rating < rating.filter || movie.rating > rating.filterTo)) {
                return false;
            }
            if (awards &&
                !awards.values.every(function (award) { return movie.awards.includes(award); })) {
                return false;
            }
            return true;
        });
    };
    return MovieList;
}());
var CategoryList = /** @class */ (function () {
    function CategoryList(categories) {
        this.categories = categories;
        this.filters = {};
    }
    CategoryList.prototype.applyFilters = function (filters) {
        this.filters = __assign(__assign({}, this.filters), filters);
    };
    CategoryList.prototype.getFilteredCategories = function () {
        var _this = this;
        return this.categories.filter(function (category) {
            var name = _this.filters.name;
            if (name &&
                !category.name.toLowerCase().includes(name.filter.toLowerCase())) {
                return false;
            }
            return true;
        });
    };
    return CategoryList;
}());
var movies = [
    {
        title: "Oppenheimer",
        releaseYear: 2023,
        rating: 8.1,
        awards: ["Oscar"],
    },
    {
        title: "Game of thrones",
        releaseYear: 2011,
        rating: 8.6,
        awards: ["Oscar"],
    },
    {
        title: "Three Body Problem",
        releaseYear: 2023,
        rating: 8.6,
        awards: ["Oscar"],
    },
    {
        title: "Green Book",
        releaseYear: 2014,
        rating: 8.2,
        awards: ["Oscar"],
    },
];
var categories = [
    { name: "Thriller", movies: [movies[0]] },
    { name: "Fantasy", movies: [movies[1]] },
    { name: "Sci-Fi", movies: [movies[2]] },
    { name: "Drama", movies: [movies[3]] },
];
var movieList = new MovieList(movies);
movieList.applyFilters({
    title: { filter: "Ga" },
    releaseYear: { filter: 2011, filterTo: 2015 },
});
var filteredMovies = movieList.getFilteredMovies();
console.log("Filtered Movies:", filteredMovies);
