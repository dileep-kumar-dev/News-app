import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';



export class News extends Component {
    static defaultProps = {
        category: "general",
        pageSize: 8
        };
    constructor(){
        super();
        this.state = {
            articles : [],
            loading : false,
            page : 1
        }
    }
    
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=692b10de10954d50bd66f6af5abcfc81&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsdata = await data.json();
        this.setState({articles : parsdata.articles, totalResults : parsdata.totalResults, loading : false})
    }
    handlePrevClick = async()=>{
        console.log("P");
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=692b10de10954d50bd66f6af5abcfc81&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsdata = await data.json();
        this.setState({
            page : this.state.page -1,
            articles : parsdata.articles,
            loading : false
        })
    }
    handleNextClick = async()=>{
        console.log("N");
        if(Math.ceil(this.state.totalResults/20)<=this.state.page){
            return;
        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=692b10de10954d50bd66f6af5abcfc81&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let parsdata = await data.json();
            this.setState({
                page : this.state.page +1,
                articles : parsdata.articles,
                loading:false
            })
        }
    }

  render() {
    return (
      <div className='container'>
        <h2>News - Headlines</h2>
        {this.state.loading && <Spinner/> }
        <div className="row">
            {!this.state.loading && this.state.articles.map((ele)=>{
                return <div className="col-md-4" key={ele.url}>
                <NewsItem title={ele.title} description={ele.description} url={ele.url} imageUrl={ele.urlToImage} />
            </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1?true:false} type='button' className="btn btn-primary" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button disabled={this.state.page>=Math.ceil(this.state.totalResults/20)} type='button' className="btn btn-primary" onClick={this.handleNextClick}> Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
