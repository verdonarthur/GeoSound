# GeoSound
## Database schema
### table : categories

| Attributes  | Description |
| ----------- | :---------: |
| id          |             |
| name        |             |
| description |             |

### table : sounds

| Attributes  | Description                                                               |
| ----------- | :-----------------------------------------------------------------------: |
| coordinate  | A coordinate, the exact implementation is still to be determined          |
| sound       | The sound in binary, recorded in DB for simplify the deployment on Heroku |
| description | A little description of the sound                                         |
| categories  | A list of id related to the category table                                |
| quality     | Devine the soins quality of a sound                                       |
| user        | The user id of the person who has recorded the sound                      |

### table : users

| Attributes | Description |
| ---------- | :---------: |
| id         |             |
| name       |             |
| password   |             |
| email      |             |

