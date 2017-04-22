import { Mongo } from 'meteor/mongo';

const Markers = new Mongo.Collection('markers');
export default Markers;
