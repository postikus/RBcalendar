/*
https://www.json-generator.com/
 */

[
    '{{repeat(400,400)}}',
    {
        id: '{{objectId()}}',
        name: '{{firstName()}} {{surname()}}',
        company: '{{company().toUpperCase()}}',
        address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
        max_pers: '{{integer(20, 40)}}',
        is_open: '{{integer(0, 1)}}',
        registred: '{{integer(0, 1)}}',
        beexpert: '{{integer(0, 1)}}',
        calendar_group: '{{objectId()}}',
        type_no_access: '123123213',
        for_type: '{{random("spec", "boss")}}',
        event_rb_type: '{{random("tle", "manp", "prof", "all")}}',
        type_val: '{{random("tle][manp", "manp][manp", "prof][manp", "all][manp")}}',
        price: '{{floating(1000, 4000, 2, "$0,0.00")}}',
        isObligatory: '{{bool()}}',
        type: '{{random("webinar", "training")}}',
        description: '<h1>{{lorem(integer(1, 7), "words")}}</h1><p>{{lorem(integer(5, 20),"words")}}<br><a href="#" title="">link</a></p><p><strong>strong </strong><em>em </em>{{lorem(integer(5, 20),"words")}}</p><h2>title2</h2><ul><li>l-item</li><li>l-item2</li></ul>',
        start_date: '{{date(new Date(2019, 0, 1), new Date(2020, 0, 1), "YYYY-MM-ddThh:mm:ss")}}',
        finish_date: function () {
            var start_date = new Date (this.start_date);
            var finish_date = new Date(start_date.setDate(start_date.getDate() + Math.floor(Math.random() * 4) + 1));
            finish_date = finish_date;
            return finish_date

        }
    }
]



    [
    '{{repeat(5, 7)}}',
    {
        _id: '{{objectId()}}',
        index: '{{index()}}',
        guid: '{{guid()}}',
        isActive: '{{bool()}}',
        balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
        picture: 'http://placehold.it/32x32',
        age: '{{integer(20, 40)}}',
        eyeColor: '{{random("blue", "brown", "green")}}',
        name: '{{firstName()}} {{surname()}}',
        gender: '{{gender()}}',
        company: '{{company().toUpperCase()}}',
        email: '{{email()}}',
        phone: '+1 {{phone()}}',
        address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
        about: '{{lorem(1, "paragraphs")}}',
        registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
        latitude: '{{floating(-90.000001, 90)}}',
        longitude: '{{floating(-180.000001, 180)}}',
        tags: [
            '{{repeat(7)}}',
            '{{lorem(1, "words")}}'
        ],
        friends: [
            '{{repeat(3)}}',
            {
                id: '{{index()}}',
                name: '{{firstName()}} {{surname()}}'
            }
        ],
        greeting: function (tags) {
            return 'Hello, ' + this.name + '! You have ' + tags.integer(1, 10) + ' unread messages.';
        },
        favoriteFruit: function (tags) {
            var fruits = ['apple', 'banana', 'strawberry'];
            return fruits[tags.integer(0, fruits.length - 1)];
        }
    }
]