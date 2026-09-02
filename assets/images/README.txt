Drop project photography here for the "Projects" grid.

Each .project-card in index.html currently renders a .project-placeholder
div. To swap in a real image, replace that div's contents with an <img>,
e.g.:

  <div class="project-placeholder">
    <img src="assets/images/meridian-cultural-center.jpg" alt="Meridian Cultural Center">
  </div>

and add this to style.css (or reuse an existing rule) so the image fills
the same aspect-ratio box the placeholder currently uses:

  .project-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

Suggested aspect ratios per card (already set in style.css, keep photos
close to these so the masonry grid stays even):
  size-tall   -> 3:4.4 (portrait)
  size-medium -> 4:4.2 (near-square)
  size-short  -> 4:3   (landscape)
