// Rem : we don't use the vehicle ids, because we use their index

// Mixins
// Elements reused by multiple components
let vehicleMixin = {
    // props : data that must be specified by the parent container
    // (here : <vehicleListItem v-bind:vehicle="...">)
    props: ['vehicle'],
    computed: {
        /**
         * Get the icon corresponding to a vehicle
         * @returns {string} the class of the icon of the vehicle
         */
        icon() {
            let icon = '';
            // check the category of the vehicle
            switch (this.vehicle.cat) {
                case "moto":
                    icon = 'fa fa-motorcycle my-darkblue';
                    break;
                case "velo":
                    icon = 'fa fa-bicycle my-green';
                    break;
                case "van":
                    icon = 'fa fa-bus my-red';
                    break;
                case "voiture":
                // if category not recognized, display the car icon
                default:
                    icon = 'fa fa-car my-orange';
                    break;
            }
            return icon;
        },
    },
};

// Components
// Must be placed before the vue

// vehicle-list
Vue.component('vehicle-list', {
    props: ['vehicles'],
    template: '#vehicleList',
    methods: {
        selectVehicle(vehicle) {
            console.log('vehicle-list received select-vehicle');
            console.dir(vehicle);
            this.$emit('select-vehicle', vehicle);
        }
    }
});

// vehicle-list-item
Vue.component('vehicle-list-item', {
    mixins: [vehicleMixin],
    template: '#vehicleListItem',
    methods: {
        selectVehicle() {
            console.log('vehicle-list-item sent select-vehicle');
            this.$emit('select-vehicle', this.vehicle);
        },
    },
});

// vehicle-detail
Vue.component('vehicle-detail', {
    mixins: [vehicleMixin],
    template: '#vehicleDetail',
});

// filters
Vue.component('filters', {
    props: ['vehicleCategories'],
    computed: {
        filters() {
            let filters = ['none'];
            filters = filters.concat(this.vehicleCategories);
            return filters;
        }
    },
    methods: {
        selectFilter(filter) {
            // Check if normal filter (not none)
            if (filter !== 'none') {
                this.$emit('select-filter', filter);
            } else {
                // filter iz none
                this.$emit('unselect-filters', filter);
            }
        },
    },
    template: '#filters',
});

// TODO add computed icon (possibly using a mixin)
// filter-element
Vue.component('filter-element', {
    props: ['filter'],
    template: '#filterElement',
    methods: {
        selectFilter() {
            this.$emit('select-filter', this.filter);
        },
    },
});

// Vue
// Contains the components
new Vue({
    el: '#container',

    data: {
        vehicles: [],
        // TODO vehicleCategories -> computed
        vehicleCategories: [
            "moto",
            "voiture",
            "van",
            "velo",
        ],
        filters: [],
        selectedVehicle: null,
    },

    computed: {
        filteredVehicles() {
            // Test if there iz at least one filter
            if (this.filters.length !== 0) {
                // return filtered vehicles
                // filtered : category of the vehicle is in the list of filters
                return this.vehicles.filter(vehicle => this.filters.includes(vehicle.cat));
            }
            // if no filters, return all vehicles
            return this.vehicles;
        },
    },

    /**
     * Initialize the data of the vue :
     * - Load the vehicles list
     * - select the first vehicle
     */
    mounted() {
        // Load the content of the const array vehicles
        this.vehicles = vehicules;
        // select the first vehicle
        this.selectedVehicle = this.vehicles[0];
    },

    methods: {
        /**
         * Change the selected vehicle
         * @param vehicle
         */
        selectVehicle(vehicle) {
            this.selectedVehicle = vehicle;
        },

        /**
         * Add a filter to the filters list if it iz not in it yet, remove it otherwise
         * @param filterValue
         */
        selectFilter(filterValue) {
            // filter not yet in the filter list
            if (!this.filters.includes(filterValue)) {
                // Add the filter to the list
                this.filters.push(filterValue);
            } else {
                // Remove the filter from the list
                this.filters = this.filters.filter(filter => filter !== filterValue);
                // I heard you liked filters, zo I added filters to your filters
            }

        },

        /**
         * Reset the Filters to an empty list
         */
        resetFilters() {
            this.filters = []
        },
    }
});
