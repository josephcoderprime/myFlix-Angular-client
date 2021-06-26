import { Component, OnInit } from '@angular/core';

// API Calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Components
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovieIds: any[] = [];

  /**
   *
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   * @param router
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
  * retrieve all movies
  **/
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   *
   * @param name
   * @param description
   * Opens modal with movie genre information
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
    });
  }

  /**
   *
   * @param name
   * @param bio
   * Opens modal with movie director information
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: { name, bio },
    });
  }

  /**
   *
   * @param synopsis
   * Opens modal with movie synopsis information
   */
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { synopsis },
    });
  }

  /**
  * check if movie is in favorites
  **/
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.favoriteMovieIds = resp.FavoriteMovies;
    });
  }

  /**
   * checks if movie is in user's list of favorites
   * @param movie_id
   * @returns 
   */
  isFavorite(movieID: string): boolean {
    console.log("Movie ID " + movieID + "favorite check");
    return this.favoriteMovieIds.includes(movieID);
  };

  /**
   * Adds or removes movie from user's list of favorites
   * @param id
   * @returns
   */
  onToggleFavoriteMovie(id: string): any {
    if (this.isFavorite(id)) {
      this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favoriteMovieIds.indexOf(id);
      return this.favoriteMovieIds.splice(index, 1);
    } else {
      this.fetchApiData.addFavorite(id).subscribe((response: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favoriteMovieIds.push(id);
  }

}