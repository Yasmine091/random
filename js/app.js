(function(d) {
    /* method 1 : precodural *//*
    var result = d.getElementById('result')

    d.getElementById('make-group').addEventListener('submit', function(e) {
        let groups = [],
            restStudents = students.slice(),
            i = 0

        // generate group
        while(restStudents.length) {
            let index = Math.floor(Math.random() * restStudents.length),
                indexGroup = i%parseFloat(d.getElementById('nb-group').value) + 1

            // Create array of group if not exist
            if(!groups[indexGroup]) {
                groups[indexGroup] = []
            }

            // add studient in target group
            groups[indexGroup].push(restStudents[index])

            // delete studient of rest
            restStudents.splice(index, 1)

            i++
        }

        // show group
        result.innerHTML = '';
        groups.forEach(function(group, index) {
            let newGroup = d.createElement('ul')

            group.forEach(function(element) {
                let newItem = d.createElement('li')
                
                newItem.appendChild(d.createTextNode(element))
    
                newGroup.appendChild(newItem)
            });
    
            result.appendChild(newGroup)
        })

        //Stop propagation
        e.preventDefault()
    });*/

    /* Method 2 : object oriented */
    function Generator(numberGroups, result) {
        this.numberGroups = numberGroups
        this.result = d.getElementById(result)
        this.groups = []
        this.restStudents = students.slice()
    }
    Generator.prototype.create = function() {
        let i = 0

        // generate group
        while(this.restStudents.length) {
            let index = Math.floor(Math.random() * Math.floor(this.restStudents.length)),
                indexGroup = i%parseFloat(this.numberGroups) + 1

            // Create array of group if not exist
            if(!this.groups[indexGroup]) {
                this.groups[indexGroup] = []
            }

            // add studient in target group
            this.groups[indexGroup].push(this.restStudents[index])

            // delete studient of rest
            this.restStudents.splice(index, 1)

            i++
        }
    }
    Generator.prototype.show = function(group, index) {
        let newGroup = d.createElement('div'),
            title = d.createElement('h2'),
            list = d.createElement('ol')
        
        title.appendChild(d.createTextNode('Groupe '+index))

        group.forEach(function(element) {
            let newItem = d.createElement('li'),
                content = d.createTextNode(element)
            
            newItem.appendChild(content)

            list.appendChild(newItem)
        });

        newGroup.appendChild(title)
        newGroup.appendChild(list)

        this.result.appendChild(newGroup)
    }
    Generator.prototype.init = function() {
        let _this = this
        
        _this.create()

        _this.result.innerHTML = '';
        _this.groups.forEach(function(element, index) {
            _this.show(element, index)
        })
    }

    // Init
    d.getElementById('make-group').addEventListener('submit', function(e) {
        let newGroup = new Generator(d.getElementById('nb-group').value, 'result')

        newGroup.init()

        //Stop propagation
        e.preventDefault()
    })
})(document);
