import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

// export default function Toast() {
//    const toast = useToast()
//   return <Button
//       onClick={() =>
//         toast({
//           title: 'Account created.',
//           description: "We've created your account for you.",
//           status: 'success',
//           duration: 9000,
//           isClosable: true,
//         })
//       }
//     >
//       Show Toast
//     </Button>
// }

export default function Toast(props) {
    return Toastify({
        text: props.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            // background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}


