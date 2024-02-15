import Electronics from "../../Assets/Electronics.jpg";

export default function ListingCard({ listing }) {
  console.log(listing);
  const listingConditions = listing.conditions;

  const formattedConditions = listingConditions
    ? listingConditions
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : null;

  const displayPictureUrl = listing.listing_display_pictures[0]?.url || Electronics;

  return (
    <>
      <div className="card m-auto w-96 bg-base-200 shadow-xl text-white mb-5">
        <figure>
          <img src={displayPictureUrl} alt="elect" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {listing.name}
            <div className="badge badge-secondary">{formattedConditions}</div>
          </h2>
          <br />
          <p className="text-sm">{listing.description}</p>
          <br />
          <p className="text-xs p-2">By: {listing.user.firstName}</p>

          <div className="card-actions justify-end">
            {listing.categories.map((category) => (
              <div className="m-2 badge badge-outline " key={category.id}>
                {category.name
                  .split("_")
                  .map((word) => word.toUpperCase())
                  .join(" ")}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="divider divider-neutral" />
    </>
  );
}
