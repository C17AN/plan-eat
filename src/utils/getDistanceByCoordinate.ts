export const getDistanceByCoordinate = ({
  srcLat,
  srcLng,
  distLat,
  distLng,
}: {
  srcLat: number;
  srcLng: number;
  distLat: number;
  distLng: number;
}) => {
  const R = 6371.0;

  const lat1Rad = (srcLat * Math.PI) / 180.0;
  const lon1Rad = (srcLng * Math.PI) / 180.0;
  const lat2Rad = (distLat * Math.PI) / 180.0;
  const lon2Rad = (distLng * Math.PI) / 180.0;

  const dlon = lon2Rad - lon1Rad;
  const dlat = lat2Rad - lat1Rad;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};
