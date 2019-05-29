var myUrl = "https://codepen.io/jobs.json";
        fetch(myUrl)
          .then((response) => response.json())
          .then((json) => this.setState({jobs: json.jobs}));
        this.setState({
            
        })