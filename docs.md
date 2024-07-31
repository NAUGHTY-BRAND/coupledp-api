API Documentation
---------------------

## Get a random matching male and female image URLs

### Request

`GET /coupledp`

### Response

Returns a JSON object containing URLs for a matching male and female image.

Example response:

```
{
  "maleUrl": "https://example.com/male-image.jpg",
  "femaleUrl": "https://example.com/female-image.jpg"
}
```

### Error responses

- `500 Internal Server Error`: Something went wrong on the server

## Add a new matching male and female image URLs

### Request

`GET /addcoupledp?maleUrl=[MALE_IMAGE_URL]&femaleUrl=[FEMALE_IMAGE_URL]`

### Query Parameters

- `maleUrl`: The URL of the male image
- `femaleUrl`: The URL of the female image

### Response

Returns a success message upon adding a new matching male and female image URLs to the data.

Example response:

```
Matching images added successfully
```

### Error responses

- `400 Bad Request`: Both maleUrl and femaleUrl parameters are required
- `500 Internal Server Error`: Something went wrong on the server

I hope this helps! Let me know if you have any questions.
