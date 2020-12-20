"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (props) {
    console.log({ props: props });
    return "\n    <h1>\n      Hello Kurt,\n    </h1>\n    <p>\n      " + props.message + "\n    </p>\n    <h3>\n      Thank you,\n    </h3>\n    <p>\n\n      <div>Name: " + props.first_name + " " + props.last_name + "</div>\n\n      <div>Email: " + props.email + "</div>\n\n      " + (props.order_number ? "<div>Order Number: " + props.order_number + "</div>" : "<div></div>") + "\n\n      <div>Reason For Contact: " + props.reason_for_contact + "</div>\n\n     \n\n      " + (props.glover_name ? "<div>Glover Name: " + props.glover_name + "</div>" : "<div></div>") + "\n\n      " + (props.instagram_handle ? "<div>Instagram Handle: " + props.instagram_handle + "</div>" : "<div></div>") + "\n\n      " + (props.facebook_name ? "<div>Facebook Name: " + props.facebook_name + "</div>" : "<div></div>") + "\n\n      " + (props.song_id ? "<div>Song ID: " + props.song_id + "</div>" : "<div></div>") + "\n\n      " + (props.quote ? "<div>Quote: " + props.quote + "</div>" : "<div></div>") + "\n\n      " + (props.inspirational_pictures ? "<div>Inspirational Pictures</div>" : "<div></div>") + "\n      " + (props.inspirational_pictures
        ? props.inspirational_pictures.map(function (picture) {
            var item = "<img style=\"width: 100%; height: auto;border-radius: 15px;margin-right: 10px\" src=" + picture + ">";
            return item;
        })
        : "<div></div>") + "\n      </p>\n\t";
});
