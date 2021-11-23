export default class Entry {
  constructor(slug, shortUrl, longUrl) {
    this.slug = slug;
    this.shortUrl = shortUrl;
    this.longUrl = longUrl;
  }

  asDatabaseValues() {
    return [this.slug, this.shortUrl, this.longUrl];
  }

  asJsonObject() {
    return {
      slug: this.slug,
      shortUrl: this.shortUrl,
      longUrl: this.longUrl,
    };
  }
}
