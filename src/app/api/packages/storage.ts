// Shared storage for package orders (in production, use a database)
export let packageOrders: any[] = [];

export function addPackageOrder(order: any) {
  packageOrders.push(order);
}

export function getPackageOrders() {
  return packageOrders;
}