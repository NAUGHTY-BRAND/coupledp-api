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
  "Girl": "https://example.com/male-image.jpg",
  "Boy": "https://example.com/female-image.jpg"
}
```

### Error responses

- `500 Internal Server Error`: Something went wrong on the server

## Add a new matching male and female image URLs

### Request

`GET /addcoupledp?Girl=[MALE_IMAGE_URL]&Boy=[FEMALE_IMAGE_URL]`

### Query Parameters

- `Girl`: The URL of the male image
- `Boy`: The URL of the female image

### Response

Returns a success message upon adding a new matching male and female image URLs to the data.

Example response:

```
Matching images added successfully
```

### Error responses

- `400 Bad Request`: Both Girl and Boy parameters are required
- `500 Internal Server Error`: Something went wrong on the server

I hope this helps! Let me know if you have any questions.
