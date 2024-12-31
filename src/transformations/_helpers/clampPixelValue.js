// ierobezo px vērtību no 0 līdz 255
const clamp = (value) => Math.min(255, Math.max(0, value));
export default clamp;