import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCourse, subscribeCourse, unSubscribeCourse } from "../../actions";
import "./courseDetail.css";
import courseCatgory from "../../resources/svgs";
import ReviewForm from "./ReviewForm";
import { createReview } from "../../actions/reviewAction";
import { addShopCart } from "../../actions/shopCartAction";
import history from "../../helpers/history";

function CourseDetail(props) {
  console.log("props from CourseDetail", props);
  const { course } = props;
  const { courseId } = useParams();
  console.log("params", courseId);
  useEffect(() => {
    console.log("#########CourseDetail props", props);
    props.fetchCourse(courseId);

    // this.unlisten = history.listen(({ pathname }) => {
    //   const urlPath = pathname.split("/");

    //   if (urlPath[urlPath.length - 1] === "detail") {
    //     // only want to fetchCourse when chaning location in detail route
    //     this.props.fetchCourse(history.location.pathname.split("/")[2]);
    //   }
    // });
    return () => {
      // clean up listener
      // this.unlisten();
    };
  }, []);

  const onSubmit = (formValues) => {
    formValues.courseId = props.course._id;
    props.createReview(formValues);
  };

  function detailHeader(course) {
    if (!Array.isArray(course)) {
      return (
        <Fragment>
          <h5>
            {" "}
            {course.category} {">"}
          </h5>
          <h1>{course.title.toUpperCase()}</h1>
          <h4>{course.description}</h4>
          <p>{course.students.length} students</p>
          <p>Created by {course.instructor.username}</p>
        </Fragment>
      );
    }
  }

  function renderPromation(course) {
    if (props.newStudent && props.newStudent - Date.now() > 0) {
      return (
        <Fragment>
          <span className="fs-3">{course.price}$</span>

          <small className="mx-2">
            <del> {course.price * 4}$</del> 75% off
          </small>
        </Fragment>
      );
    } else {
      return <Fragment>Price: {course.price} $</Fragment>;
    }
  }

  function renderSubscribeBtn(course) {
    if (
      props.auth.isSignedIn &&
      course.students.indexOf(props.auth.user.userId) >= 0
    ) {
      return (
        <button
          className="btn btn-outline-danger w-75 my-3"
          onClick={() => {
            props.unSubscribeCourse(course);
          }}
        >
          Unsubscribe
        </button>
      );
    }
    return (
      <button
        className="btn btn-outline-primary w-75 my-3"
        onClick={() => {
          props.subscribeCourse(course);
        }}
      >
        Subscribe
      </button>
    );
  }

  function renderSideBar(course) {
    return (
      <div className="sideBar text-center">
        <img
          src={courseCatgory[course.category.toLowerCase()]}
          className="card-img-top"
          alt="course"
        />
        <p className="mt-3">{renderPromation(course)}</p>
        <button
          className="btn btn-outline-warning w-75 mt-3"
          onClick={() => {
            props.addShopCart(course);
          }}
        >
          <h5> Add to cart</h5>
        </button>
        {renderSubscribeBtn(course)}
        {/* <button className="btn btn-outline-primary w-75 my-3">
          <h5> Subscribe now</h5>
        </button> */}

        <h5>This course includes: </h5>
        <ul className="fontAwesome px-3 text-start">
          <li className="list-group-item px-4"> &#xf03d; 2 hours content</li>

          <li className="list-group-item px-4"> &#xf02d; 3 articles</li>
          <li className="list-group-item px-4"> &#xf15b; 5 files</li>
        </ul>
      </div>
    );
  }

  function contentRender(course) {
    let seeds =
      course.title[0].charCodeAt() +
      course.title[1].charCodeAt() * 3 +
      course.title[2].charCodeAt() * 2;
    seeds = 6 + Math.floor(seeds % 10);
    return Array.apply(null, Array(seeds)).map((empty, ind) => {
      return (
        <div key={ind}>
          <h5>Chapter {ind + 1}</h5>
          <p className="txtIndent">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repellendus natus eos molestiae fugiat. Maxime, possimus autem?
            Voluptates praesentium facere ex eaque, non animi consequuntur
            reprehenderit mollitia quae incidunt perspiciatis ipsa.
          </p>
        </div>
      );
    });
  }
  function renderLearn() {
    return (
      <div className="fontAwesome">
        <div className="row">
          <div className="col-6">
            &#xf00c; reprehenderit mollitia quae incidunt perspiciatis ipsa{" "}
          </div>
          <div className="col-6">&#xf00c; sit amet consectetur</div>
        </div>
        <div className="row">
          <div className="col-6">&#xf00c; Repellendus natus eos</div>
          <div className="col-6">
            &#xf00c; Voluptates praesentium facere ex eaque{" "}
          </div>
        </div>
        <div className="row">
          <div className="col-6">&#xf00c; Maxime, possimus autem</div>
          <div className="col-6">&#xf00c; non animi consequuntur</div>
        </div>
        <div className="row">
          <div className="col-6">&#xf00c; Lorem ipsum dolor</div>
        </div>
      </div>
    );
  }

  function renderComments(course) {
    if (course.reviews.length === 0) {
      return <h1>There are no comments...</h1>;
    }
    function renderStars(n) {
      return Array.apply(null, Array(5)).map((empty, ind) => {
        return ind < n ? (
          <div className="starMark" key={ind}></div>
        ) : (
          <div key={ind}>☆</div>
        );
      });
    }

    function renderTimeDiff(time) {
      const reviewTime = Date.parse(time);
      const timeDiff = Math.floor((Date.now() - reviewTime) / 1000 / 3600);

      return timeDiff < 24
        ? timeDiff + " hours ago"
        : Math.floor(timeDiff / 24).toString() + "days ago";
    }

    return course.reviews.map((review, ind) => {
      return (
        <div className="card m-0 mt-2 p-3" key={ind}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="user d-flex flex-row align-items-center">
              <div className="fontAwesome">&#xf007;</div>
              <span className="mx-2">
                <div className="font-weight-bold text-primary">
                  {review.reviewer}
                </div>{" "}
              </span>{" "}
            </div>{" "}
            <small> {renderTimeDiff(review.date)}</small>
          </div>

          <div className="d-flex justify-content-strat mx-3">
            {renderStars(review.rating)}
          </div>

          <div className=" d-flex justify-content-between mt-2 align-items-center">
            <div className="px-4">
              <p className="txtIndent">{review.content}</p>
            </div>
            <div className="icons align-items-center">
              {" "}
              <i className="fa fa-star text-warning"></i>{" "}
              <i className="fa fa-check-circle-o check-icon"></i>{" "}
            </div>
          </div>
        </div>
      );
    });
  }

  function renderCommentArea(course) {
    return (
      <div className="commentArea mt-5">
        <h1>Comments:</h1>
        {/* leave comment */}
        <ReviewForm onSubmit={onSubmit} />
        {/* leave comment */}

        <h3 className="mx-2">Other comments:</h3>
        {renderComments(course)}
      </div>
    );
  }

  if (Array.isArray(props.course)) {
    return <Fragment></Fragment>;
  }

  if (!course) {
    return null;
  }

  return (
    <Fragment>
      <div className="bg-dark detailHeaderBg">
        <div className="text-light text-wrapped detailHeader">
          {detailHeader(course)}
        </div>
      </div>
      {renderSideBar(course)}
      <div className="detailBody mt-3">
        <div className="card my-3">
          <div className="card-body">
            <h3>
              <strong>What you will learn:</strong>
            </h3>
            {renderLearn()}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>course content</h2>
          </div>
          <div className="card-body">{contentRender(course)}</div>
        </div>
        {renderCommentArea(course)}
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    course: state.courses.length ? state.courses[0] : false,
    newStudent: state.newStudent.firstVisited,
    auth: state.auth,
  };
};
export default connect(mapStateToProps, {
  fetchCourse,
  createReview,
  subscribeCourse,
  unSubscribeCourse,
  addShopCart,
})(CourseDetail);
