import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import Search from "../../shared/GlowLEDsComponents/GLTable/Search";
import { GLButton } from "../../shared/GlowLEDsComponents";
import * as API from "../../api";
import config from "../../config";
import { domain } from "../../helpers/sharedHelpers";

const ContentsPage = () => {
  const params = useParams();
  const [search, set_search] = useState("");
  const category = params.category ? params.category : "";
  const contentPage = useSelector(state => state.contents);
  const { loading, contents, message, error, success } = contentPage;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listContents({}));
    }
    return () => (clean = false);
  }, [success, dispatch]);
  const handleListItems = e => {
    e.preventDefault();
    dispatch(API.listContents({ category, search }));
  };

  const deleteHandler = content => {
    dispatch(API.deleteContent(content._id));
  };

  const change_content_status = content => {
    dispatch(
      API.saveContent({
        ...content,
        active: content.active ? false : true,
      })
    );
    dispatch(API.listContents({}));
    dispatch(API.listContents({}));
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Contents | Glow LEDs</title>
      </Helmet>

      <div className="wrap jc-b">
        <a href={`${domain()}/links`}>
          <GLButton variant="primary" style={{ width: "160px" }}>
            Visit Links Page
          </GLButton>
        </a>
        <Link to="/secure/glow/editcontent">
          <GLButton variant="primary" style={{ width: "160px" }}>
            Create Content
          </GLButton>
        </Link>
      </div>

      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>Contents</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        <Search search={search} set_search={set_search} handleListItems={handleListItems} category={category} />
      </div>
      <Loading loading={loading} error={error}>
        {contents && (
          <div className="content-list responsive_table">
            <table className="table">
              <thead>
                <tr>
                  <th>Active</th>
                  <th>Home Page</th>
                  <th>Banner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((content, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: "#3e4c6d",
                      fontSize: "16px",
                    }}
                  >
                    <td className="p-10px">
                      <GLButton
                        variant="icon"
                        onClick={() => change_content_status(content)}
                        aria-label={content.active ? "deactive" : "activate"}
                      >
                        {content.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
                      </GLButton>
                    </td>
                    <td className="p-10px paragraph_font" style={{ minWidth: "5rem" }}>
                      {content.home_page && content.home_page.h1}
                    </td>
                    <td className="p-10px paragraph_font" style={{ minWidth: "15rem" }}>
                      {content.banner && content.banner.label}
                    </td>
                    {/* <td className="p-10px paragraph_font" style={{ minWidth: '10rem' }}>{content.about_page}</td> */}
                    <td className="p-10px paragraph_font">
                      <div className="jc-c">
                        <Link to={"/secure/glow/editcontent/" + content._id}>
                          <GLButton variant="icon" aria-label="Edit">
                            <i className="fas fa-edit" />
                          </GLButton>
                        </Link>
                        <GLButton variant="icon" onClick={() => deleteHandler(content)} aria-label="Delete">
                          <i className="fas fa-trash-alt" />
                        </GLButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Loading>
    </div>
  );
};
export default ContentsPage;
