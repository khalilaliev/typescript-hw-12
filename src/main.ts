interface IMovie {
  title: string;
  releaseYear: number;
  rating: number;
  awards: string[];
}

interface ICategory {
  name: string;
  movies: IMovie[];
}

type MatchFilter = { filter: string };
type RangeFilter = { filter: number; filterTo: number };
type ValueFilter = { values: string[] };

interface IMovieFilters {
  title?: MatchFilter;
  releaseYear?: RangeFilter;
  rating?: RangeFilter;
  awards?: ValueFilter;
}

interface ICategoryFilters {
  name?: MatchFilter;
}

class MovieList {
  private movies: IMovie[];
  private filters: IMovieFilters;

  constructor(movies: IMovie[]) {
    this.movies = movies;
    this.filters = {};
  }

  applyFilters(filters: IMovieFilters) {
    this.filters = { ...this.filters, ...filters };
  }

  getFilteredMovies(): IMovie[] {
    return this.movies.filter((movie) => {
      const { title, releaseYear, rating, awards } = this.filters;
      if (
        title &&
        !movie.title.toLowerCase().includes(title.filter.toLowerCase())
      ) {
        return false;
      }
      if (
        releaseYear &&
        (movie.releaseYear < releaseYear.filter ||
          movie.releaseYear > releaseYear.filterTo)
      ) {
        return false;
      }
      if (
        rating &&
        (movie.rating < rating.filter || movie.rating > rating.filterTo)
      ) {
        return false;
      }
      if (
        awards &&
        !awards.values.every((award) => movie.awards.includes(award))
      ) {
        return false;
      }

      return true;
    });
  }
}

class CategoryList {
  private categories: ICategory[];
  private filters: ICategoryFilters;

  constructor(categories: ICategory[]) {
    this.categories = categories;
    this.filters = {};
  }

  applyFilters(filters: ICategoryFilters) {
    this.filters = { ...this.filters, ...filters };
  }

  getFilteredCategories(): ICategory[] {
    return this.categories.filter((category) => {
      const { name } = this.filters;

      if (
        name &&
        !category.name.toLowerCase().includes(name.filter.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }
}

const movies: IMovie[] = [
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

const categories: ICategory[] = [
  { name: "Thriller", movies: [movies[0]] },
  { name: "Fantasy", movies: [movies[1]] },
  { name: "Sci-Fi", movies: [movies[2]] },
  { name: "Drama", movies: [movies[3]] },
];

const movieList = new MovieList(movies);

movieList.applyFilters({
  title: { filter: "Ga" },
  releaseYear: { filter: 2011, filterTo: 2015 },
});

const filteredMovies = movieList.getFilteredMovies();
console.log("Filtered Movies:", filteredMovies);
