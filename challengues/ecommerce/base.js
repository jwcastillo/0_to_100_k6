import { sleep, group } from 'k6'
import http from 'k6/http'
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js'

export const options = {

  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let formData, response

  const vars = {}

  group('page_1 - http://ecommerce.test.k6.io/', function () {
    // home
    response = http.get('http://ecommerce.test.k6.io/', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(17.7)
  })

  group('page_2 - http://ecommerce.test.k6.io/product/cap/', function () {
    response = http.get('http://ecommerce.test.k6.io/product/cap/', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(10.9)

    formData = new FormData()
    formData.boundary = '----WebKitFormBoundaryTJh1EcLikBt1Nwbx'
    formData.append('quantity', '1')
    formData.append('add-to-cart', '18')

    response = http.post('http://ecommerce.test.k6.io/product/cap/', formData.body(), {
      headers: {
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryTJh1EcLikBt1Nwbx',
        origin: 'http://ecommerce.test.k6.io',
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(1.2)

    response = http.post(
      'http://ecommerce.test.k6.io/?wc-ajax=get_refreshed_fragments',
      {
        time: '1695396958417',
      },
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-requested-with': 'XMLHttpRequest',
        },
      }
    )
    sleep(9.6)
  })

  group('page_3 - http://ecommerce.test.k6.io/cart/', function () {
    response = http.get('http://ecommerce.test.k6.io/cart/', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })
    sleep(13.4)
  })

  group('page_4 - http://ecommerce.test.k6.io/checkout/', function () {
    response = http.get('http://ecommerce.test.k6.io/checkout/', {
      headers: {
        'upgrade-insecure-requests': '1',
      },
    })

    vars['woocommerce-process-checkout-nonce1'] = response
      .html()
      .find('input[name=woocommerce-process-checkout-nonce]')
      .first()
      .attr('value')

    sleep(1.4)

    response = http.post(
      'http://ecommerce.test.k6.io/?wc-ajax=update_order_review',
      {
        security: '0c6b308c47',
        payment_method: 'cod',
        country: 'US',
        state: 'CO',
        postcode: '',
        city: '',
        address: '',
        address_2: '',
        s_country: 'US',
        s_state: 'CO',
        s_postcode: '',
        s_city: '',
        s_address: '',
        s_address_2: '',
        has_full_address: 'false',
        post_data:
          'billing_first_name=&billing_last_name=&billing_company=&billing_country=US&billing_address_1=&billing_address_2=&billing_city=&billing_state=CO&billing_postcode=&billing_phone=&billing_email=&order_comments=&payment_method=cod&woocommerce-process-checkout-nonce=2c001cde45&_wp_http_referer=%2Fcheckout%2F',
      },
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-requested-with': 'XMLHttpRequest',
        },
      }
    )
    sleep(24.6)

    response = http.post(
      'http://ecommerce.test.k6.io/?wc-ajax=update_order_review',
      {
        security: '0c6b308c47',
        payment_method: 'cod',
        country: 'CL',
        state: '',
        postcode: '',
        city: '',
        address: '',
        address_2: '',
        s_country: 'CL',
        s_state: '',
        s_postcode: '',
        s_city: '',
        s_address: '',
        s_address_2: '',
        has_full_address: 'false',
        post_data:
          'billing_first_name=Wen&billing_last_name=Castillo&billing_company=&billing_country=CL&billing_address_1=&billing_address_2=&billing_city=&billing_state=&billing_postcode=&billing_phone=&billing_email=&order_comments=&payment_method=cod&woocommerce-process-checkout-nonce=2c001cde45&_wp_http_referer=%2F%3Fwc-ajax%3Dupdate_order_review',
      },
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-requested-with': 'XMLHttpRequest',
        },
      }
    )
    sleep(13.5)

    response = http.post(
      'http://ecommerce.test.k6.io/?wc-ajax=update_order_review',
      {
        security: '0c6b308c47',
        payment_method: 'cod',
        country: 'CL',
        state: 'RM',
        postcode: '',
        city: 'santiago',
        address: 'Santiago',
        address_2: '',
        s_country: 'CL',
        s_state: 'RM',
        s_postcode: '',
        s_city: 'santiago',
        s_address: 'Santiago',
        s_address_2: '',
        has_full_address: 'true',
        post_data:
          'billing_first_name=Wen&billing_last_name=Castillo&billing_company=&billing_country=CL&billing_address_1=Santiago&billing_address_2=&billing_city=santiago&billing_state=RM&billing_postcode=&billing_phone=&billing_email=&order_comments=&payment_method=cod&woocommerce-process-checkout-nonce=2c001cde45&_wp_http_referer=%2F%3Fwc-ajax%3Dupdate_order_review',
      },
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-requested-with': 'XMLHttpRequest',
        },
      }
    )
    sleep(23.7)

    response = http.post(
      'http://ecommerce.test.k6.io/?wc-ajax=checkout',
      {
        billing_first_name: 'Wen',
        billing_last_name: 'Castillo',
        billing_company: '',
        billing_country: 'CL',
        billing_address_1: 'Santiago',
        billing_address_2: '',
        billing_city: 'santiago',
        billing_state: 'RM',
        billing_postcode: '',
        billing_phone: '987654321',
        billing_email: 'wen@wenstudio.dev',
        order_comments: '',
        payment_method: 'cod',
        'woocommerce-process-checkout-nonce': `${vars['woocommerce-process-checkout-nonce1']}`,
        _wp_http_referer: '/?wc-ajax=update_order_review',
      },
      {
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'x-requested-with': 'XMLHttpRequest',
        },
      }
    )
    sleep(5.2)
  })

  group(
    'page_5 - http://ecommerce.test.k6.io/checkout/order-received/41719/?key=wc_order_AVkeURY56sF9n',
    function () {
      response = http.get(
        'http://ecommerce.test.k6.io/checkout/order-received/41719/?key=wc_order_AVkeURY56sF9n',
        {
          headers: {
            'upgrade-insecure-requests': '1',
          },
        }
      )
      sleep(1.5)

      response = http.post(
        'http://ecommerce.test.k6.io/?wc-ajax=get_refreshed_fragments',
        {
          time: '1695397051304',
        },
        {
          headers: {
            accept: '*/*',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-requested-with': 'XMLHttpRequest',
          },
        }
      )
    }
  )
}
